import React, {useState, useEffect} from 'react';
import FormInput from './FormInput';
import PropTypes from 'prop-types';
const BmiCalculator = (props) => {
    
    const {getBmiValue} = props;
    const [heightUnit, setHeightUnit] = useState('cm');
    
    const [weightUnit, setWeightUnit] = useState('kg');
    
    const [unit, setUnit] = useState('Metric');

    // const [count, setCount] = useState({
    //     
    // });
    const [count, setCount] = useState({
        data:{
            heightCount : '0',
            inchesCount : '0',
            weightCount : '0'
        }
    });
    const {data } = count;
    const { heightCount, inchesCount, weightCount} = data;

    useEffect(()=>{
        metricBMI(heightCount, weightCount);
        imperialBMI(heightCount, weightCount, inchesCount);

        // eslint-disable-next-line
    },[heightCount, weightCount, inchesCount]);

    const onChangeInput = e =>{
        const {name, value}= e.target;
        const {data}= count;
        setCount({
            data:{
                ...data,
                [name]:value
            }
        });
    }

    const onSelectTag = e => {
        setUnit(e.target.value);
        if(e.target.value === 'Metric'){
            setHeightUnit('cm');
            setWeightUnit('kg');
        }
        else{
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    }

    const metricBMI = (height, weight) =>{
        if(height>0 && weight>0){
            height /= 100;
            const bmi = weight/ (height*height);
            getBmiValue(Math.round(bmi));
        }
    }

    const imperialBMI = (height, weight, inches) =>{
        if (height> 0 && weight>0 && inches>0){
            const heightToInches = (height *12) + parseInt(inches);
            const bmi = 703* (weight/(heightToInches * heightToInches));
            getBmiValue(Math.round(bmi));
        }
    }

    const resetData = e=> {
        e.preventDefault();
        getBmiValue(0);
        setUnit('Metric');
        setCount({
            data:{
                heightCount : '0',
                inchesCount : '0',
                weightCount : '0'
            }
        });
        setHeightUnit('cm');
        setWeightUnit('kg');
    }

    return (
        <>
         <div className="bmi-inputs">
            <div className="bmi-input-fields">
                <div>
                    <span className="label-unit">Unit</span>
                    <div className="unit">
                        <select
                            name="unit"
                            value={unit}
                            className="form-control form-control-sm"
                            onChange={onSelectTag}
                            >

                            <option value="Metric">Metric</option>
                            <option value="Imperial">Imperial</option>
                        </select>
                    </div>
                </div>
                <FormInput 
                    type="text"
                    name="heightCount"
                    title={`height (${heightUnit})`}
                    value={heightCount}
                    onChange={onChangeInput}
                />
                {
                    unit === 'Imperial' ?
                <FormInput 
                    type="text"
                    name="inchesCount"
                    title="(in)"
                    value={inchesCount}
                    onChange={onChangeInput}
                /> : ''
                }
                <FormInput 
                    type="text"
                    name="weightCount"
                    title="weight (kg)"
                    value={weightCount}
                    onChange={onChangeInput}
                />
            </div>     

            <button className="button" type="submit" onClick={resetData}>Reset</button>
        </div>   
        </>
    )
}
BmiCalculator.propTypes ={
    getBmiValue: PropTypes.func.isRequired
}
export default BmiCalculator;
