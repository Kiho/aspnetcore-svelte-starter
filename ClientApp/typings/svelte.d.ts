declare module "*.html" {
    interface Component {
      new (options: any): any;
    }
    const component: Component;
    export default component;
}
  
