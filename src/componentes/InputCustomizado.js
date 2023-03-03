import React, { Component} from 'react';

export default class InputCustomizado extends Component {
    render(){
        return(
            <div class="form-group">
                  <label for="formGroupExampleInput">{this.props.label}</label>
                  <input type={this.props.type} className="form-control" id={this.props.id} name={this.props.name} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange}/>
                </div>

        );

    }
}