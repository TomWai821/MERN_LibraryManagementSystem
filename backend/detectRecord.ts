import { detectExpiredLoanRecord, modifyFinesAmount } from "./schema/book/bookLoaned";
import { detectExpiredSuspendRecord } from "./schema/user/suspendList";

const detectRecords = () => 
{
    const DayToMillionSeconds = 24 * 60 * 60 * 1000;
    setInterval(detectExpiredSuspendRecord, DayToMillionSeconds);
    setInterval(modifyFinesAmount, DayToMillionSeconds);
    setInterval(detectExpiredLoanRecord, DayToMillionSeconds);
}

export default detectRecords;