import { v4 as uuidv4 } from "uuid";
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
  import SearchBarIcon from "../../components/Icons/HeaderIcons/SearchBarIcon";
  import Widget from "../../components/Widget/Widget.js";
  import mock from "../tables/mock.js";
  import { useContext, useEffect, useState } from "react";
  import moreIcon from "../../assets/tables/moreIcon.svg";
  import s from "../tables/Tables.module.scss";
  import h from "../../components/Header/Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {blockUser, fetchStandings, fetchStudentsByInstitute, unBlockkUser} from './store/action/index'
import AppContext from "../../../../context/AppContext";

const InstituteStudents = () => {
    const pageSize = 10;
    const dispatch = useDispatch()
    const appContext = useContext(AppContext)
    const standings = useSelector(state => state.standing.students)
    const [tableDropdownOpen, setTableMenuOpen] = useState(false);
    const [secondTableCurrentPage, setSecondTableCurrentPage] = useState(0);
    const secondTablePagesCount = Math.ceil(standings.length / pageSize); 
    const setSecondTablePage = (e, index) => {
        e.preventDefault();
        setSecondTableCurrentPage(index);
      }

    const tableMenuOpen = () => {
        setTableMenuOpen(!tableDropdownOpen);
      }

    const handleBlockUser = (item) => {
      if(!item.blocked)
      blockUser(item.id)
      .then(res => {
        let severity = "error"
        if(res.status) {
          severity = "success"
          dispatch(fetchStudentsByInstitute())
        }
        appContext.showSnackbar({message:res.data, severity})
      })
    }
    const handleunBlockUser = (item) => {
      if(item.blocked)
      unBlockkUser(item.id)
      .then(res => {
        let severity = "error"
        if(res.status) {
          severity = "success"
          dispatch(fetchStudentsByInstitute())
        }
        appContext.showSnackbar({message:res.data, severity})
      })
    }

    useEffect(()=>{
      dispatch(fetchStudentsByInstitute())
    },[])

    return (
        <div>
             <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Standings</div>
                  <Navbar className={`${h.root} d-print-none p-0`}>
                  <Form className="d-none d-sm-block" inline>                  
                  <FormGroup>
                        <InputGroup className='input-group-no-border'>
                            <Input id="search-input" placeholder="Search " className='focus'/>
                            <InputGroupAddon addonType="prepend">
                            <span>
                                <SearchBarIcon/>
                            </span>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    </Form>
                    </Navbar>
                </div>
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
                      <th className={s.nameCol}>NAME</th>
                      <th>EMAIL</th>
                      <th>PROBLEM SOLVED</th>
                      <th>SCORE</th>
                      <th>STATUS</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {standings
                      .slice(
                        secondTableCurrentPage * pageSize,
                        (secondTableCurrentPage + 1) * pageSize
                      )
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
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.problemSolved}</td>
                        <td>{item.score}</td>
                        <td><Badge style={{backgroundColor:item.blocked ? "red" : "#2aa22a"}}>{item.blocked ? "Blocked" : "Active"}</Badge></td>
                        <td>
                          <>
                        <Badge onClick={() => handleBlockUser(item)} style={{backgroundColor: item.blocked ? "GrayText" : "red",marginRight:10,cursor:item.blocked ? "not-allowed":"pointer"}}>{ "Block"}</Badge>
                        <Badge onClick={() => handleunBlockUser(item)} style={{backgroundColor: item.blocked ? "#2aa22a" : "GrayText",cursor: item.blocked ? "pointer" : "not-allowed"}}>{"Unblock"}</Badge>
                          </>
                          </td>
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
              </Widget>
            </Col>
          </Row>
        </div>
    )
}

export default InstituteStudents;