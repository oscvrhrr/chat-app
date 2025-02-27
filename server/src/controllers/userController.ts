import { UserRepository } from "../db/queries/users.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";







export const  signup =  async(req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const { fullname, email, password } = req.body;
    const newUser = await UserRepository.createUser(fullname, email, password);
    if(newUser) {
      const jwtSecret = process.env.JWT_SECRET;
      if(!jwtSecret) {
       res.status(500).json({ error: "Error the jwt secret is undefined" });
       return;
      }
      const token = jwt.sign({ id: newUser.id }, jwtSecret , { expiresIn: "2hr"});
      res.status(201).json({ token });
    } else {
      res.status(400).json({ error: "Error user creation failed"});
    }
  } catch(error) {
    next(error)
  }
}

export const login = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const jwtSecret = process.env.JWT_SECRET;
  if(req.user && jwtSecret) {
    const token = jwt.sign({ id: req.user.id }, jwtSecret, { expiresIn: "2hr" });
    res.status(200).json({ token });
  }
}

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  const data = req.user
  if(data !== undefined) {
    const { password, ...rest } = data;
    res.status(200).json({ user: rest })
  }

}

export const getUsers = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const users = await UserRepository.getAllUsers();
  const me = req.user
  if(users) {
    const usersWithoutCurrentUser = users.filter((user) => user.id !== me?.id);
    res.status(200).json({ users: usersWithoutCurrentUser })
  }
}

export const getProfiles = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const profiles = await UserRepository.getAllProfiles();
  const me = req.user;
  if(profiles) {
    const profilesWithoutCurrentUser = profiles.filter((profile) => profile.userId !== me?.id)
    res.status(200).json({ profiles: profilesWithoutCurrentUser })
  }
}

export const getProfileByID = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userid } =  req.params;
  const profile = await UserRepository.getProfileByID(Number(userid))
  res.status(200).json({ profile })
}


export default { signup, login, getUsers, getMe, getProfiles, getProfileByID }


