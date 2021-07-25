import cx from 'classnames';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class PositionInput extends PureComponent {
    static propTypes = {
        defaultValue: PropTypes.string,
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        min: PropTypes.number,
        max: PropTypes.number
    };

    static defaultProps = {
        defaultValue: '',
        min: -10000,
        max: 10000
    };

    state = {
        value: this.props.defaultValue
    };
    node = null;
    handleChange = this.handleChange.bind(this);
    safeSave = this.safeSave.bind(this);

    componentDidMount() {
        this.node.focus();
    }
    handleFocus(event) {
        event.target.select();
    }
    handleChange(event) {
        const value = event.target.value;
        this.setState({
            value
        });
    }
    safeSave() {
        const {
            onSave = noop,
            defaultValue,
            min,
            max
        } = this.props;

        const input = this.state.value.replace(',', '.');
        let calc = input;
        if (input.startsWith('/')) {
            calc = defaultValue / input.substring(1);
        }
        if (!input.startsWith('-') && input.includes('-')) {
            const numbers = input.split('-');
            calc = parseFloat(numbers.shift());
            numbers.forEach((number, i) => {
                calc -= parseFloat(number);
            });
        }
        if (!input.startsWith('-') && input.includes('+')) {
            const numbers = input.split('+');
            calc = parseFloat(numbers.shift());
            numbers.forEach((number, i) => {
                calc += parseFloat(number);
            });
        }

        if (!Number.isNaN(calc) && calc >= min && calc <= max) {
            onSave(calc);
        }
    }
    render() {
        const {
            // onSave = noop,
            onCancel = noop,
            // min,
            // max,
            className,
            style
        } = this.props;
        const isNumber = (this.state.value !== '');

        return (
            <div
                className={cx(className, 'input-group', 'input-group-xs')}
                style={{ ...style, width: '100%' }}
            >
                <input
                    ref={node => {
                        this.node = node;
                    }}
                    type="text"
                    className="form-control"
                    placeholder=""
                    style={{ borderRight: 'none' }}
                    value={this.state.value}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) { // ENTER
                            this.safeSave();
                        }
                        if (event.keyCode === 27) { // ESC
                            onCancel();
                        }
                    }}
                />
                <div className="input-group-btn">
                    <button
                        type="button"
                        className="btn btn-default"
                        disabled={!isNumber}
                        onClick={this.safeSave}
                    >
                        <i className="fa fa-fw fa-check" />
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={(event) => {
                            onCancel();
                        }}
                    >
                        <i className="fa fa-fw fa-close" />
                    </button>
                </div>
            </div>
        );
    }
}

export default PositionInput;
