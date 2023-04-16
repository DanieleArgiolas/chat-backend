import Express from "express";

class MainController {

    show(req: Express.Request, res: Express.Response) {
        return res.send('Hello From MainController');
        // res.json({ test: 'this is a' })
    }

    test(req: Express.Request, res: Express.Response){
        return res.send('Testing ittt')
    }

}

const mainController = new MainController();

export {mainController as MainController}