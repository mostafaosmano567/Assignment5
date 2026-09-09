import { Sequelize , DataTypes } from "sequelize";

const sequelize = new Sequelize("assignment5", "root", "root", {
    port: 3306,
    host: "localhost",
  dialect: "mysql",
});

export const connectDB = async () => {
    try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
}


export const syncDB = async () => {
    try {
  await sequelize.sync();
  console.log("Database sync successfully.");
} catch (error) {
  console.error("Unable to sync the database:", error);
}
}
export default sequelize;