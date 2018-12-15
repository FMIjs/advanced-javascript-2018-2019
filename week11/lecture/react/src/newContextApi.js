import React, { createContext } from 'React';
import { connect } from 'react-redux';

export const customContext = createContext();
const { Provider, Consumer } = customContext;

export function connectCustomContext(Cmp) {
  return function (props) {
    return <Consumer>{(context) => {
      return <Cmp {...props} {...context} />
    }}</Consumer>
  }
}

class AppCustomContextProvider extends React.Component {
  state = {
    someValue: 'that will change over time',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading === this.props.isLoading) { return; }
    this.setState({
      isLoading
    });
  }

  render() {
    const { children } = this.props;
    // Because context uses reference identity to determine when to re-render, 
    // there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders.
    // By providing the state as a value we make sure that no additional re-renders are going to be made.
    return <Provider value={this.state}>
      {children}
    </Provider>
  }
}
function mapStateToProps(state) {
  return {
    isLoading: state.users.isLoding
  };
}

export default connect(mapStateToProps)(AppCustomContextProvider);


export { Provider, Consumer };
const context = { Provider, Consumer };