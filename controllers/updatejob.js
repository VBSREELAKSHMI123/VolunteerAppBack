const { updatejobmodel } = require("../models/updatejob")

const handleSearchJob = (req,res)=>{
    let input = req.body;
    updatejobmodel.find(input).then((response) => {
      res.json(response);
    }).catch(() => {
      res.send('error');
    });
}

const handleDeleteJob = (req,res)=>{
      const { _id } = req.body;
      updatejobmodel.findByIdAndDelete(_id)
        .then((response) => {
          if (response) {
            res.json({ status: "deleted" });
          } else {
            res.json({ status: "failed" });
          }
        })
        .catch((error) => {
          console.error("Error deleting job:", error);
          res.json({ status: "error" });
        });
}

const handleUpdatedView = (req,res)=>{
      updatejobmodel.find().then((response) => {
        res.json(response);
        console.log(response)
      }).catch(() => {
        res.json({ status: 'error' });
      });
}

const handleAddJob = async (req,res)=>{
    let input = req.body
    let updatejob = new updatejobmodel(input)
    updatejob.save()
    res.json({ "status": "success" })
}

module.exports={handleSearchJob,handleDeleteJob,handleUpdatedView,handleAddJob}