import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Home from './components/home';
import Details from './components/details';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/detail/:id" component={Details} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );

    }
}

export default App;