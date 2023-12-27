import React, { useState, useEffect } from 'react';
import '../layouts/CropList.css';
import ReactPaginate from 'react-paginate';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../layouts/CropList.css'; // Assuming this file contains your custom CSS for CropList

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const cropsPerPage = 10;

  useEffect(() => {
    // Fetch crops data from API_ENDPOINT_URL
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json');
        const data = await response.json();
        setCrops(data.data); // Set fetched crop data to state
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchData();
  }, []);

  const openModal = (crop) => {
    setSelectedCrop(crop); // Set the selected crop for modal display
  };

  const closeModal = () => {
    setSelectedCrop(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0); // Reset page number when searching
  };
  

  const filteredCrops = crops.filter((crop) =>
    crop.crop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCrops.length / cropsPerPage);
  const offset = pageNumber * cropsPerPage;
  const currentPageCrops = filteredCrops.slice(offset, offset + cropsPerPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
    console.log(`Clicked page number: ${selectedPage + 1}`);
  };

  return (
    <div className="search-page">
      <div className="search-bar">
        <TextField
          id="outlined-basic"
          label="Search by crop name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="contained" color="primary">
          Search
        </Button>
      </div>
      <div className="crop-grid">
        {currentPageCrops.map((crop) => (
          <div key={crop.id} className="crop-card" onClick={() => openModal(crop)}>
            <img src={crop.thumbnails[0].image} alt={crop.crop_name} className="crop-image" />
            <p className="crop-name">{crop.crop_name}</p>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'previous-page'}
        nextLinkClassName={'next-page'}
        disabledClassName={'pagination-disabled'}
        activeClassName={'pagination-active'}
      />
      {selectedCrop && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedCrop.thumbnails[0].image} alt={selectedCrop.crop_name} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CropList;
