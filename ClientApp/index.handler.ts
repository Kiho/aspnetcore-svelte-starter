import roadtrip from 'roadtrip';

export default class IndexHandler {
    component

    constructor(private ctor, private target) {
        
    }

    get route() {
        return {
            enter: (current, previous) => { 
                this.component = new this.ctor({
                    target: this.target, // document.getElementById('app'),
                    data: {
                        name: 'world'
                    }
                });           
                roadtrip.RouteData = current;
                console.log('Entered', current);                
                console.log('roadtrip', roadtrip);
            },
            leave: (current, previous) => {
                this.component.destroy();
                console.log('Left index!');
            }
        }
    }
}