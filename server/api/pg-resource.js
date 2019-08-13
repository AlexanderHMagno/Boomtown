function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is more than a little complicated.
   *  - Can you refactor it to be simpler / more readable?
   *  - Is this
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? "" : ","}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          "INSERT INTO users (fullname ,email ,password) VALUES ($1, $2, $3) RETURNING *",
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        console.log(e.message);
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: `SELECT * 
               FROM users 
               WHERE email= $1 `,
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT id,email,fullname,bio 
               FROM users 
               WHERE id=$1`,

        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getItems(idToOmit) {
      const items =
        idToOmit == undefined
          ? await postgres.query({
              text: `SELECT * FROM items`
            })
          : await postgres.query({
              text: `SELECT * FROM items WHERE ownerid != ${idToOmit}`
            });

      return items.rows;
    },
    async getSpecificItem(id) {
      const items =
        id == undefined
          ? await postgres.query({
              text: `SELECT * FROM items`
            })
          : await postgres.query({
              text: `SELECT * FROM items WHERE id = ${id}`
            });

      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE ownerid=$1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE borrowerid=$1`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      const tags = await postgres.query({
        text: "Select * From tags"
      });
      return tags.rows;
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT tags.title, tags.id
               FROM itemtags 
               JOIN tags on tags.id=itemtags.tagid 
               WHERE itemtags.itemid= $1`,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              let borrower = item.borrower == null ? null : item.borrower[0].id;
              // insert new item mutation
              const tagsQuery = {
                text: `INSERT INTO items (title,imageurl,description,ownerid,borrowerid) 
                       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
                values: [
                  item.title,
                  item.image,
                  item.description,
                  item.owner[0].id,
                  borrower
                ]
              };
              // async the new item mutation
              const newValue = await postgres.query(tagsQuery);

              // Once received the new id... we can create the other insertion.
              const insertTags = {
                text: `INSERT INTO itemtags (tagid ,itemid ) VALUES ${tagsQueryString(
                  [...item.tags],
                  newValue.rows[0].id,
                  ""
                )}`,
                values: item.tags.map(tag => tag.id)
              };
              // make async
              await postgres.query(insertTags);
              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }

                done(); // use commit transaction to resolve newItem.rows[0]
                resolve(newValue.rows[0]);
              });
            });
          } catch (e) {
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
