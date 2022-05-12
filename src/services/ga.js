
import ReactGA from 'react-ga';

class Ga {
    constructor() {
        ReactGA.initialize('G-XMS8X65Z96');
    }

    event(category, action, value) {
        ReactGA.event({
            category: category,
            action: action,
            label: value
        });
    }

    pageview() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
}

export default Ga;