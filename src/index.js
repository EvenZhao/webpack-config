import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { createStore, combineReducers } from 'redux';
import { connect, Provider} from 'react-redux';

const initStoreState = {
    userInfo: {
        like: '',
    },
    userName:'',
    pageInfo: {
    },
}

const syncAction = (type, payload) => {
    return {
        type,
        payload,
    };
};

const asyncAction = (type) => {
    if (type === 'userInfo') {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const res = { like: 'yy' };
                syncAction('USER_INFO', res);
                resolve();
            }, 1000);
        });
    } else if (type === 'pageInfo') {
        setTimeout(() => {
            const res = { };
            syncAction('PAGE_INFO', res);
        }, 1000);
    } 
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

const userNameReducer = function(state,  action) {
    console.log(action,state)
    if (action.type === 'USER_NAME') {
        if(Object.prototype.toString.call(action.payload)=="[object Object]"){
           return {
               ...state,
            ...action.payload
           } 
       } else {
            return action.payload
       }
    }
    return state || null;
}

const pageInfoReducer = function(state,  action) {
    if (action.type === 'PAGE_INFO') {
        return {
            ...state,
            ..._action.payload
        }
    }

    return state || null;
}

const rootReducer = combineReducers({ userInfo: userInfoReducer, pageInfo: pageInfoReducer,userName:userNameReducer })

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
        const { userName } = this.props;
        console.log(this.props)
        return (
            <ul>
                <li>{userName}</li>
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
    async componentDidMount() {
        await this.props.dispatch(asyncAction('USER_INFO'));
        // this.props.dispatch(asyncAction('PAGE_INFO'));
        // this.props.dispatch(asyncAction('PAGE_INFO', 'USER_INFO'));
        // console.log();



        // setTimeout(() => {
        //     this.props.dispatch(syncAction('USER_NAME', 'yy'));
        // }, 1000);
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



