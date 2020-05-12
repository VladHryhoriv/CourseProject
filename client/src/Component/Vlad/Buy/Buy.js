import React from 'react'
import style from './Buy.module.css'
import { reduxForm } from 'redux-form'
import { createField } from '../../Common/Field/Field'
import { Input } from '../../Common/FormInput/Input'
import { require } from '../../../Validators/Validate'
import cx from 'classnames'

class Buy extends React.Component {
    baseUrlForPhoto = 'http://localhost:5000'

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className={style.wrapper}>
                    <div className={style.photo}><img src={this.baseUrlForPhoto + this.props.pizza.photo} alt="NoImg"></img></div>
                    <div className={style.wrapperInWrapper}>
                        <div className={style.wrapperForm}>
                            <div className={style.description}>
                                <span className={style.name}>{this.props.pizza.name}</span>
                                <span className={style.price}>{this.props.count === 0 ? this.props.pizza.price : this.props.pizza.price * this.props.count} грн</span>
                            </div>
                            <div className={style.item100}>
                                <div className={cx(style.count , style.item)}>Кількість</div>
                                <div>{createField('Кількість', 'count', 'text', Input, [require], style.countInput, null, (e) => this.props.onChange(e))}</div>
                            </div>
                            <div className={style.item100}>
                                <div className={ cx(style.address , style.item)}>Адреса доставки</div>
                                <div>{createField('Адреса', 'address', 'text', Input, [require], style.addressInput, null)}</div>
                            </div>
                            <div className={style.item100}>
                                <div className={ cx(style.email , style.item)}>Ваш email для сформування чека</div>
                                <div>{createField('Email', 'email', 'text', Input, [require], style.emailInput, null)}</div>
                            </div>
                            <div className={style.error}></div>
                            {/* <div className={style.submit}> */}
                                <button>Заказати</button>
                                {/* </div> */}
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}
export const BuyForm = reduxForm({ form: "buy" })(Buy)