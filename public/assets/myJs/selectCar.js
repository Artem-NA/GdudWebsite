document.getElementById('car-make').addEventListener('change', function() {
    const make = this.value;
    const modelDropdown = document.getElementById('car-model');

    modelDropdown.innerHTML = '<option value="">דגם</option>';
// check if make is not null
    if (make) {
        modelDropdown.disabled = false;
//current database
        const carModels = {
            'Toyota': ['Camry', 'Corolla', 'Prius'],
            'seatt': ['איביזה', 'Civic', 'Fit'],
            'army': ['טיגריס', 'דוד', 'אושקוש']
        };
// if user selected one of the options make an array of the big array else put empty array
        const models = carModels[make] || [];
//add to the new dropdown list
        models.forEach(function(model) {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelDropdown.appendChild(option);
        });
    } else { // if nothing selected dont give the user the option to choose second drop down menu
        modelDropdown.disabled = true;
    }
});