class UserTable{
    constructor(UserID, Nickname, Job, LV, Meso, JobCode){
        this.UserID = UserID //primary key
        this.Nickname = Nickname
        this.Job = Job
        this.LV = LV
        this.Meso = Meso
        this.JobCode = JobCode
    }
}
module.exports = UserTable