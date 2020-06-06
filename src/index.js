import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { createStore, combineReducers } from 'redux';
import { connect, Provider} from 'react-redux';

const initStoreState = {
    userInfo: {
        like: '',
    },
    pageInfo: {
    },
}

const syncAction = (type, payload) => {
    return {
        type,
        payload,
    };
}

const userInfoReducer = function(state,  action) {
    console.log(action,state)
    if (action.type === 'USER_INFO') {
        return {
            ...state,
            ...action.payload,
        }
    }
    return state || null;
}

const pageInfoReducer = function(state,  action) {
    if (action.type === 'PAGE_INFO') {
        return {
            ...state,
            ...action.payload
        }
    }

    return state || null;
}

const rootReducer = combineReducers({ userInfo: userInfoReducer, pageInfo: pageInfoReducer })

// create store
const store = createStore(rootReducer, initStoreState);


// 将state和action传递给组件
function mapStateToProps(state) {
    return state;
}

class UserInfoInput extends React.Component {
    render() {
        const { like } = this.props.userInfo;
        return (
            <input onChange={ event => this.props.dispatch(syncAction('USER_INFO', { like:event.target.value }))} value={ like } />           
        )
    }
}
const ConnectUserInfoInput = connect(mapStateToProps)(UserInfoInput);


class UserInfo extends React.Component {   
    render() {
        const { like } = this.props.userInfo;

        return (
            <h2 style={{ border: '3px solid #999' }}>
                TA喜欢
                {
                    like
                    ? 
                    like
                    :
                    '暂无'
                }
            </h2>
            
        ) 
    }
}
const ConnectUserInfo = connect(mapStateToProps)(UserInfo);


class UserInfoPage extends React.Component {  
    render() {
        return (
            <>
                <ConnectUserInfo />
                <ConnectUserInfoInput />
            </>
                    
        ) 
    }
    
}

class RecommendList extends React.Component {    
    render() {
        const { like } = this.props.userInfo;
        console.log(this.props)
        return (
            <ul>
                {
                    like 
                    ?
                    <li>{like}</li>
                    :
                    <li>暂无推荐</li>
                }
            </ul>
        ) 
    }
}
const ConnectRecommendList = connect(mapStateToProps)(RecommendList);

class App extends React.Component {    
    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(syncAction('USER_INFO', {
                like: '茅台',
            }));
        }, 1000);
    }

    render() {
        return (
            <>
                <UserInfoPage />
                <ConnectRecommendList />
            </>
        )
    }
}
const ConnectApp = connect()(App);


ReactDOM.render(
    <Provider store={ store }>
        <ConnectApp />
    </Provider>,
    document.querySelector('#root')
);



