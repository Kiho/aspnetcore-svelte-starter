export default class IndexHandler {
    component

    constructor(private ctor) {
        
    }

    get route() {
        return {
            enter: (current, previous) => { 
                this.component = new this.ctor({
                    target: document.getElementById('app-root'),
                    data: {
                        name: 'world'
                    }
                });           
                console.log('Entered index!');
            },
            leave: (current, previous) => {
                this.component.destroy();
                console.log('Left index!');
            }
        }
    }
}