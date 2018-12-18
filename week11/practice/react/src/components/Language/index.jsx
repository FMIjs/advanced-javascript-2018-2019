import React from 'react';
import { Redirect } from 'react-router-dom'
import { withRouter, } from 'react-router';
import './styles.css';

const translations = {
  'User List': 'Потребители',
  'User Add': 'Добави Потребител',
  'Save': 'Запази',
  'Email': 'Е-мейл',
  'Name': 'Име',
  'Username': 'Потребителско име',
  'Edit': 'Редактирай'
}

const LanguageContext = React.createContext();

export const connectLanguageContext = Cmp => props => (
  <LanguageContext.Consumer>
    {cntx => <Cmp {...props} {...cntx} />}
  </LanguageContext.Consumer>
);

class Language extends React.Component {

  state = {
    lang: null
  };

  constructor(props) {
    super(props);
    const { location: { pathname } } = this.props;
    const lang = pathname.slice(1, 3);
    this.state = {
      lang,
      translate: this.translate
    };
  }

  translate = (value) => {
    return this.state.lang === 'bg' ? translations[value] || value : value;
  }

  componentDidUpdate() {
    const { location: { pathname } } = this.props;
    const lang = pathname.slice(1, 3);
    if (this.state.lang === lang) { return; }
    this.setState({
      lang
    });
  }

  handleLanguageChange = () => {
    const { history, location: { pathname } } = this.props;
    const { lang } = this.state;
    history.push(pathname.replace(lang, lang === 'en' ? 'bg' : 'en'));
  };

  render() {
    const { children, location: { pathname } } = this.props;
    const lang = pathname.slice(1, 3);

    return (
      <div>
        {lang === '' && <Redirect to="/bg/" />}
        <div id="language-switcher">
          <div className={lang === 'bg' ? 'selected' : undefined} onClick={this.handleLanguageChange}>BG</div>
          <div className={lang === 'en' ? 'selected' : undefined} onClick={this.handleLanguageChange}>EN</div>
        </div>
        <LanguageContext.Provider value={this.state}>
          {children}
        </LanguageContext.Provider>
      </div>
    )
  }
}

export default withRouter(Language);