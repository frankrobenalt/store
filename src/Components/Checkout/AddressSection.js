import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

class AddressSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            addressLineOne: '',
            addressLineTwo: '',
            city: '',
            state: '',
            zip: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
      }
     
      handleChange(address){
        this.setState({ addressLineOne: address });
      };
     
      handleSelect(address){
        geocodeByAddress(address)
          .then(results => {
              console.log(results);
              this.props.updateAddress(results[0].formatted_address);
              this.setState({
                  addressLineOne: `${results[0].address_components[0].long_name} ${results[0].address_components[1].long_name}`,
                  city: results[0].address_components[2].long_name,
                  state: results[0].address_components[4].short_name,
                  zip: results[0].address_components[6].long_name 
              })
          })
        //       getLatLng(results[0]);

        //   })
        //   .then(latLng => console.log('Success', latLng))
        //   .catch(error => console.error('Error', error));
      };

      handleAddressChange(event){
          this.setState({
              addressLineTwo: event.target.value
          })
      }

      handleCityChange(event){
          this.setState({
              city: event.target.value
          })
      }

      handleStateChange(event){
          this.setState({
            state: event.target.value
          })
      }

      handleZipChange(event){
          this.props.updateAddress(`${this.state.addressLineOne} ${this.state.addressLineTwo}, ${this.state.city}, ${this.state.state} ${event.target.value}`);
          this.setState({
              zip: event.target.value
          })
      }
     
      render() {
        return (
        <div className="address-form">
          <div className="form-header">
              Shipping Address
          </div>
          <PlacesAutocomplete
            value={this.state.addressLineOne}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#919191', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <div className="form-header" style={{ marginTop: `20px` }}>
              Apartment #, Suite, etc. (optional)
          </div>
          <input type="text" name="addresslinetwo" id="addresslinetwo" onChange={this.handleAddressChange.bind(this)} />
          <div className="small-input-row">
            <div className="small-input-cell">
                <div className="form-header">
                    City
                </div>
                <input type="text" name="city" id="city" value={this.state.city} onChange={this.handleCityChange.bind(this)} />
            </div>
            <div className="small-input-cell">
                <div className="form-header">
                    State
                </div>
                <input type="text" name="state" id="state" value={this.state.state} onChange={this.handleStateChange.bind(this)} />
            </div>
            <div className="small-input-cell">
                <div className="form-header">
                    Zip
                </div>
                <input type="text" name="zip" id="zip" value={this.state.zip} onChange={this.handleZipChange.bind(this)} />
            </div>
          </div>
        </div>
        );
      }
}

export default AddressSection;