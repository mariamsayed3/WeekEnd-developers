import { Result, Button } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'

const EmptyList = ({msg, buttonText, path}) =>{
    return <Result
    icon={<FrownOutlined />}
    title={msg}
    style={{marginTop:'10%'}}
    extra={<Button type="primary"> <Link to={path}>  {buttonText} </Link> </Button>}
  />

}
export default EmptyList