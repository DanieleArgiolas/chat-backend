
import { Container, interfaces } from 'inversify';
import { SocketService } from '../services/socket-service';
import { ServerStarter } from '../server/server-starter';



class DependencyContainer {
  private readonly container: Container;

  constructor() {
    this.container = new Container();
    this.registerDependencies();
  
  }

  private registerDependencies(): void {
    this.container.bind<SocketService>('SocketService').to(SocketService);
    this.container.bind<ServerStarter>('ServerStarter').to(ServerStarter);
  }

  public get<T>(identifier: string): T {
    return this.container.get<T>(identifier);
  }

  public resolve<T>(newable: interfaces.Newable<T>): T{
    return this.container.resolve<T>(newable)
  }

}

export {DependencyContainer}