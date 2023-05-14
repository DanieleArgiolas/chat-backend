import Express from "express";

class LoginController {

    login(req: Express.Request, res: Express.Response) {
     res.json({ test: 'this is a Test'  })
    }

    test(req: Express.Request, res: Express.Response) {
        res.json({ test: 'this is a Test' })
       }
   

}

const c = new LoginController();

export {c as LoginController}