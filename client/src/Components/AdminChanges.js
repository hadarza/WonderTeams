import React from 'react'

const AdminChanges = ({file}) => {

    const options = [
        'Animate', 'Storyline', 'Web','Unity'
      ];
      const defaultOption = options[0];
      
  return (
    <Form action="/upload" method="POST">
        <h2> {file.name}  שינויים בקובץ </h2>
        <div className='sectionName-File'>
            <label>שם הקובץ</label>
            <input value={file.name}/>
        </div>

        <div className='sectionNewfile'>
            <input type="file" name="file" id="file" className='custom-file-input'/>
            <label for="file" className='custom-file label'>בחר קובץ חדש</label>
            <label>החלפת קטגורייה</label>
        </div>        
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        
        <input type="submit" value='Submit'/>
    </Form>
  )
}

export default AdminChanges