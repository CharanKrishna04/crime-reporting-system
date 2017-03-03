import React, { Component , PropTypes} from 'react';
import './Navigation.css';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Web from 'material-ui/svg-icons/av/web';
import { AuthMiddleware } from '../../store'
import {deepOrangeA700} from 'material-ui/styles/colors';




function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthMiddleware.logout())
    };
}

class Navigation extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps){
    /*
    setTimeout(()=> {
      if(!this.props.isAuthenticated){
        console.log("Logout true");
          this.context.router.push("/login");
      }
    },0);
    */
  }

  /*
  handelSignin() {
    this.props.logout();
  }*/

  renderAuthenticatedUserMenu(){
    const menu = (
      <div>
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="File A Report"
              leftIcon={<Web/>}
              containerElement={<Link to="/filereport"/>}
          />
          <MUI.MenuItem
            className="navigation-menuItem"
            primaryText="View My Reports"
            leftIcon={<Web/>}
            containerElement={<Link to="/myreports"/>}
          />
      </div>
    );
    return menu;
  }

  drawerMenu(){
    return (
      <div>
          <div className="navigation-avatar-div">
            <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"
                    size={50}
                    className="navigation-icon"/>
            <span className="navigation-span">{this.props.authUser.fullName}</span>
          </div>
          <MUI.MenuItem
              className="navigation-menuItem"
              primaryText="Dashboard"
              leftIcon={<Assessment/>}
              containerElement={<Link to="/dashboard"/>}
            />
          {
            this.props.isAuthenticated?this.renderAuthenticatedUserMenu():null              
          }  
          
      </div>
    );
  }

  renderActionButtons(){

    const signup_signin_btn = (
            <div>
              <MUI.RaisedButton style={{marginRight:10}} label="Sign In" onTouchTap={()=>this.context.router.push("/login")}/>
              <MUI.RaisedButton label="Sign Up" onTouchTap={()=>this.context.router.push("/signup")}/>
            </div>);

    const signout = (
            <div>
              <MUI.RaisedButton label="Sign out" onTouchTap={this.props.logout}/>
            </div>
            )

    if(this.props.isAuthenticated){
      return signout;
    }
    else {
      return signup_signin_btn;
    }
  }
  render() {
    return (
      <div className="navigation-container">
        <MUI.AppBar style={this.props.styles} title="Blood Bank System"
              onLeftIconButtonTouchTap={this.props.drawerToggle}
              iconElementRight={this.renderActionButtons()}
              />
        <MUI.Drawer open={this.props.drawerOpen} docked={false}
            onRequestChange={this.props.drawerToggle}>
          {this.drawerMenu()}
        </MUI.Drawer>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation);
