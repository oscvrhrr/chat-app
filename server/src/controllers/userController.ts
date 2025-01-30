import { UserRepository } from "../db/queries/users.js";
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";





export const  signup =  async(req: Request, res: Response, next:NextFunction ): Promise<void> => {
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


export default { signup }


