import React from 'react';

const ListItem = (props) => {
    return <li>{props.value}</li>
}

const numbers = [1, 2, 3, 4, 5];

const NumberList = (props) => {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
    <ListItem key={number.toString()} value={number} />
    )

    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default <NumberList numbers={numbers} />;