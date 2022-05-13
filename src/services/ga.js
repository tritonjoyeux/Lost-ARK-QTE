
import ReactGA from 'react-ga';

class Ga {
    constructor() {
        ReactGA.initialize('G-KQ0V1M8QYY');
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