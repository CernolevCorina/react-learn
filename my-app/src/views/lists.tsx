import React from 'react';
import Blog from './lists/blog';
import List from './lists/List'

export default class Lists extends React.Component {
    render() {
        return(
            <div>
                {Blog}
                {List}
            </div>
        )
    }
}