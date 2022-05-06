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

export default function EventSubmissions() {
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
                      <th className={s.nameCol}>USER NAME</th>
                      <th>EMAIL</th>
                      <th>PROBLEM NAME</th>
                      <th>LANGUAGE</th>
                      <th>TIME</th>
                      <th>STATUS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {submissions
                      .slice(
                        secondTableCurrentPage * pageSize,
                        (secondTableCurrentPage + 1) * pageSize
                      ).reverse()
                      .map(item => (
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
                        <td>{item.user}</td>
                        <td>{item.email}</td>
                        <td>{item.problemName}</td>
                        <td>{item.language}</td>
                        <td>{dateDifference(new Date(item.date),new Date(),{compact: true})} ago</td>
                        <td><Badge style={{backgroundColor:item.status?"green":"red"}}>{item.status?"Success":"Failed"}</Badge></td>
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