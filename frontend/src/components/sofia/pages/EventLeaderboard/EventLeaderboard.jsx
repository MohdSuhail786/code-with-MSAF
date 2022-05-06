import React, { useEffect, useState } from 'react';
import s from "../tables/Tables.module.scss";
import HomeHeader from "../../../utilityComponent/HomeHeader/HomeHeader";
import {useParams} from 'react-router-dom'
import {
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    ButtonDropdown,
    Navbar,
    Dropdown,
    DropdownMenu,
    Input,
    InputGroupAddon,
    InputGroup,
    DropdownToggle,
    Form,
    FormGroup,
    DropdownItem,
    Label,
    Badge,
  } from "reactstrap";
  import dateDifference from 'date-difference'
  import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentEvent } from '../../../utilityComponent/Event/store/action';

const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

export default function EventLeaderboard() {
    const pageSize = 10;
    const dispatch = useDispatch()
    const [tableDropdownOpen, setTableMenuOpen] = useState(false);
    const [secondTableCurrentPage, setSecondTableCurrentPage] = useState(0);
    const submissions = useSelector(state => state.event?.submissions)
    const secondTablePagesCount = Math.ceil(submissions.length / pageSize); 
    const setSecondTablePage = (e, index) => {
        e.preventDefault();
        setSecondTableCurrentPage(index);
      }
    const {eventName} = useParams()
    useEffect(()=>{
        dispatch(getCurrentEvent({eventName}))
    },[])

    let result = Object.values(groupBy(submissions, 'userId')).map(item => {
        return item.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.problemCode === value.problemCode && t.status === value.status
        )) && value.status === true
      )
    }).sort((a,b) => {
      if(b.length !== a.length)
        return a.length - b.length;
      return (new Date(b[b.length-1].date) - new Date(a[a.length-1].date));
    }).reverse();

  console.log(result)
    return (
        <>
            <HomeHeader />
            <div style={{width:'70%',margin:'auto',marginTop:120}}>
            <div className="widget-table-overflow">
                  <Table className="table-striped table-borderless table-hover" responsive>
                    <thead>
                    <tr>
                      <th>
                        <div className="checkbox checkbox-primary">
                          <input
                            id="checkbox200"
                            className="styled"
                            type="checkbox"
                          />
                          <label for="checkbox200"/>
                        </div>
                      </th>
                      <th className={s.nameCol}>RANK</th>
                      <th className={s.nameCol}>USER NAME</th>
                      <th>EMAIL</th>
                      <th>PROBLEM SOLVED</th>
                      <th>COLLEGE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {result
                      .slice(
                        secondTableCurrentPage * pageSize,
                        (secondTableCurrentPage + 1) * pageSize
                      )
                      .map((item,i) => (
                      <tr key={uuidv4()}>
                        <td>
                          <div className="checkbox checkbox-primary">
                            <input
                              id={item.id}
                              className="styled"
                              type="checkbox"
                            />
                            <label for={item.id} />
                          </div>
                        </td>
                        <td>{i+1}</td>
                        <td>{item[0].user}</td>
                        <td>{item[0].email}</td>
                        <td>{item.length}</td>
                        <td>{item[0].college}</td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-with-border">
                    <PaginationItem disabled={secondTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={e => setSecondTablePage(e, secondTableCurrentPage - 1)}
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(secondTablePagesCount)].map((page, i) =>
                      <PaginationItem active={i === secondTableCurrentPage} key={i}>
                        <PaginationLink onClick={e => setSecondTablePage(e, i)} href="#top">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                    <PaginationItem disabled={secondTableCurrentPage >= secondTablePagesCount - 1}>
                      <PaginationLink
                        onClick={e => setSecondTablePage(e, secondTableCurrentPage + 1)}
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
                </div>
        </>
    )
}