import express, { Application, Request, Response, NextFunction  } from 'express';
import { webRouter } from '../routes/web';
import morgan from 'morgan';
import cors from 'cors';
import { createServer, Server as HttpServer } from 'http';
class Server {
  private app: Application;
  private httpServer: HttpServer;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
    this.httpServer = createServer(this.app);
  }

  private configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan('tiny'));
  }

  private configureRoutes() {
    this.app.use('/', webRouter);
  }

  private configureErrorHandling() {
     // Catch 404 errors and forward to error handler


  this.app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not Found');
    (error as any).status = 404;
    next(error); // pass the error object to the next middleware function
  });

  // Error handler
  this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Set the status code based on the error or default to 500
    res.status((err as any).status || 500);

    // Log the error to the console
    console.error(err);

    // Return an error response to the client
    res.json({
      error: {
        message: err.message
      }
    });
  });
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }


  public getHttpServer(): HttpServer {
    return this.httpServer;
  }

}


export {Server}