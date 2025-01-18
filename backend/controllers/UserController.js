import Users from "../models/UserModels.js";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne({
        where:{
            id: req.params.id
        }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUsers = async (req, res) => {
  const {title, task} = req.body;
  if (title.length === 0) return res.status(400).json({msg: "*Tambahkan title anda"});
  if (task.length === 0) return res.status(400).json({ msg: "*Tambahkan deskripsi task anda"});
  try {
    await Users.create({
      title: title,
      task: task
    });
    res.status(201).json({msg: 'Task Created'});
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUsers = async (req, res) => {
  try {
    await Users.update(req.body, {
        where:{
            id: req.params.id
        }
    });
    
    res.status(200).json({ msg: "Task Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const statusUsers = async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;
    const task = await Users.findByPk(id);
    if (task) {
      task.status = status;
      await task.save();
    }
    res.status(200).json({ msg: "Task Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Task Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
