import { Card, CardHeader, CardBody, CardTitle, CardText } from 'reactstrap'
import ReactPaginate from 'react-paginate';

const SecondPage = () => {
  return (
    <>
        <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        activeClassName="active"
        />


    <Card>
      <CardHeader>
        <CardTitle>Create Awesome 🙌</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>This is your second page prueba</CardText>
        <CardText>
          Chocolate sesame snaps pie carrot cake pastry pie lollipop muffin. Carrot cake dragée chupa chups jujubes.
          Macaroon liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o dragée chocolate.
        </CardText>
      </CardBody>
    </Card>

    </>



  )
}

export default SecondPage
