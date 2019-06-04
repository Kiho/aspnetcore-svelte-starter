import roadtrip from 'roadtrip';

roadtrip.Routing = {};

export default class IndexHandler {
    static notify: (data: string) => void;

    component

    constructor(private ctor, private target) {
        
    }

    get route() {
        return {
            enter: (current, previous) => { 
                this.component = new this.ctor({
                    target: this.target,
                });   
                console.log('Entered!', current); 
                IndexHandler.notify(current); 
            },
            leave: (current, previous) => {
                this.component.$destroy();
                console.log('Left!', current);                
            }
        }
    }
}