// 职位
const POSITION_TYPE={
	FINANCIAL:"财务人员",
	PERSONNEL:"人事人员",
	OPERATION:"运营人员",
	MARKETING:"营销人员",
	MANAGEMENT:"管理人员",
	SERVICE:"客服人员",
	OTHERS:"其他"
}
 
export function formatPosition(status){
	if(!POSITION_TYPE[status]){
		return "请选择"
	}
	return POSITION_TYPE[status]
}