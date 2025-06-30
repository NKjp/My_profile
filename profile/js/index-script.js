//生年月日から今の年齢を計算して表示
document.addEventListener('DOMContentLoaded', function () {
	var birthdayText = document.getElementById("birthday").innerText;
	var birthday = new Date(birthdayText);
	var currentDate = new Date();
	
	var age = currentDate.getFullYear() - birthday.getFullYear();
	
	if (currentDate.getMonth() < birthday.getMonth() || (currentDate.getMonth() === birthday.getMonth() && currentDate.getDate() < birthday.getDate())) {
		age--;
	}
	document.getElementById("age").innerText = age + "歳";
});