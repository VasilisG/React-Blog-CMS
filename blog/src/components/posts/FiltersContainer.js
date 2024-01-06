import { useState } from 'react';
import ActionButton from './ActionButton';
import CreateLink from './CreateLink';
import Filters from './Filters';

const FiltersContainer = ({ callback }) => {

  const [activeFilters, setActiveFilters] = useState(false);

  const toggleFilters = () => {
      setActiveFilters(!activeFilters);
  }

  return (
    <>
      <div className="create-link-container px-4 py-4 my-4 d-flex justify-content-between">
          <ActionButton additional_class="toggle-filters-button" text={activeFilters ? 'Hide filters' : 'Show filters'} clickCallback={toggleFilters}/>
          <CreateLink additional_class="create-post-link" text="Create Post" router_name="/posts/create"/>
      </div>
      <Filters 
        activeFilters={activeFilters}
        callback={callback}
      />
    </>
  )
}

export default FiltersContainer;