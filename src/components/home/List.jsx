import React from 'react';
import { Link } from "react-router-dom";
import PropTyps from "prop-types";

let List = ({list}) => (
    <ul className="movielist">
        {
            list.map((item,index) => {
                return (
                    <Link to={"/detail/"+item.id} key={item.id}>
                        <div className="movieimg">
                            <img src = {item.images.small} alt={item.alt}/>
                        </div>
                        <div className="info">
                            {index}<h3>{item.title}</h3>
                        </div>
                    </Link>
                )
            })
        }
    </ul>    
)
List.propTyps = {
    list : PropTyps.array
}
export default List