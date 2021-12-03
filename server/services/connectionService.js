import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence'




let DbConnection = function () {

    let db = null;
    let instance = 0;

    async function DbConnect() {
        try {
            let _db = await mongoose
                .connect(process.env.DB_URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
            return _db
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            instance++;     // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${instance} times`);

            if (db != null) {
                console.log(`db connection is already alive`);
                return db;
            } else {
                console.log(`getting new db connection`);
                db = await DbConnect();
                return db;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}

const AutoIncrement = AutoIncrementFactory(new DbConnection().Get())
export {AutoIncrement}
export default DbConnection;