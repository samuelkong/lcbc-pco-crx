
class LanguageUtil {
	static dictionary = {
		"add-adult": {
			"en-US": "+ Add adult",
			"zh-HK": "+ 加成人",
			"zh-CN": "+ 加成人"
		},
		"add-child": {
			"en-US": "+ Add child",
			"zh-HK": "+ 加兒童",
			"zh-CN": "+ 加儿童"
		},
		"birthdate": {
			"en-US": "Birthdate",
			"zh-HK": "出生日期",
			"zh-CN": "出生日期"
		},
		"after-submitting-this-form": {
			"en-US": "After submitting this form, please enter the last four digits of your phone number into one of the tablet/iPad to check-in your child and print their name tags.",
			"zh-HK": "提交此表格後，請在平板電腦/iPad 上輸入您手機號碼的後四位數字，以便為您的孩子辦理簽到並列印他們的姓名標籤。",
			"zh-CN": "提交此表格后，请在平板电脑或 iPad 上输入您电话号码的后四位数字，以便为孩子办理签到并打印姓名牌。"
		},
		"are-you-the-parent-guardian-of-the-children-listed-above": {
			"en-US": "Are you the parent/guardian of the children listed above?",
			"zh-HK": "您是上述兒童的家長/監護人嗎？",
			"zh-CN": "您是上述儿童的父母或监护人吗？"
		},
		"email-address": {
			"en-US": "Email address",
			"zh-HK": "電子郵件",
			"zh-CN": "电子邮件"
		},
		"female": {
			"en-US": "Female",
			"zh-HK": "女",
			"zh-CN": "女"
		},
		"first-name": {
			"en-US": "First name",
			"zh-HK": "名字",
			"zh-CN": "名"
		},
		"form-instruction": {
			"en-US": "Please start by filling in your information as the <strong>adult/parent</strong> of the child.",
			"zh-HK": "請先填寫您作為孩子<strong>監護人/家長</strong>的資料。",
			"zh-CN": "请先填写您作为儿童的<strong>成年人/家长</strong>一方的个人信息。"
		},
		"gender": {
			"en-US": "Gender",
			"zh-HK": "性别",
			"zh-CN": "性别"
		},
		"grade": {
			"en-US": "Grade",
			"zh-HK": "年級",
			"zh-CN": "年级"
		},
		"home": {
			"en-US": "Home",
			"zh-HK": "家",
			"zh-CN": "家"
		},
		"household-instructions": {
			"en-US": '• Please <strong>Add Child</strong> for <em>each</em> child you plan to check-in.<br>• Please <strong>Add Adult</strong> if you want your spouse to be able to check-in and check-out the children.',
			"zh-HK": '• 請為<em>每位</em>計劃辦理入住的兒童添<strong>加兒童</strong>資訊。<br>• 如果您希望您的配偶能夠辦理兒童的入住和退房手續，請<strong>加成人</strong>資訊。',
			"zh-CN": '• 请为<em>每一位</em>计划办理签到（check-in）的儿童添<strong>加儿童</strong>信息。<br>• 如果您希望配偶也能为孩子办理签到和签退（check-out），请添<strong>加成人</strong>信息。'
		},
		"last-name": {
			"en-US": "Last name",
			"zh-HK": "姓氏",
			"zh-CN": "姓"
		},
		"male": {
			"en-US": "Male",
			"zh-HK": "男",
			"zh-CN": "男"
		},
		"medical-notes": {
			"en-US": "Food allergies",
			"zh-HK": "食物過敏",
			"zh-CN": "食物过敏"
		},
		"mobile": {
			"en-US": "Mobile",
			"zh-HK": "手機",
			"zh-CN": "手机"
		},
		"new-children-registration": {
			"en-US": "New Children Registration",
			"zh-HK": "新生兒登記",
			"zh-CN": "新儿童登记"
		},
		"phone-number": {
			"en-US": "Phone number",
			"zh-HK": "電話號碼",
			"zh-CN": "电话号码"
		},
		"mobile-number-that-we-can-call": {
			"en-US": "Mobile number that we can call/text if there's an emergency.",
			"zh-HK": "緊急情況下我們可以撥打/發送簡訊的手機號碼。",
			"zh-CN": "紧急情况下可供我们致电或发送短信的手机号码。"
		},
		"name": {
			"en-US": "Name",
			"zh-HK": "名字",
			"zh-CN": "姓名"
		},
		"no": {
			"en-US": "No",
			"zh-HK": "否",
			"zh-CN": "否"
		},
		"other": {
			"en-US": "Other",
			"zh-HK": "其他",
			"zh-CN": "其他"
		},
		"select": {
			"en-US": "Select…",
			"zh-HK": "選擇。。。",
			"zh-CN": "选择。。。"
		},
		"submit": {
			"en-US": "Submit",
			"zh-HK": "提交",
			"zh-CN": "提交"
		},
		"work": {
			"en-US": "Work",
			"zh-HK": "工作",
			"zh-CN": "工作"
		},
		"yes": {
			"en-US": "Yes",
			"zh-HK": "是",
			"zh-CN": "是"
		},
		"your-name": {
			"en-US": "Your name",
			"zh-HK": "你的名字",
			"zh-CN": "您的姓名"
		}
		
	};

	static get(key) {
		if (!Object.hasOwn(this.dictionary, key)) {
			console.log("Error: Unknown language key = " + key);
		}

		return this.dictionary[key][locale];
	}
}