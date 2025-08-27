let users = {'admin': 'password123','user': '123456'};
let userData = [];
let currentUser = null;
function login(){const u=document.getElementById('username').value,p=document.getElementById('password').value;
if(!u||!p){alert('❌ กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');return;}
if(users[u]&&users[u]===p){currentUser=u;showMainApp();loadUserData();
document.querySelector('#userInfo h2').textContent=`👋 ยินดีต้อนรับ, ${u}!`;
document.getElementById('username').value='';document.getElementById('password').value='';}
else alert('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง\n\nทดลองใช้:\n- admin / password123\n- user / 123456');}
function logout(){currentUser=null;showLoginForm();clearForm();}
function showMainApp(){document.getElementById('loginSection').classList.add('hidden');document.getElementById('mainApp').classList.remove('hidden');}
function showLoginForm(){document.getElementById('loginSection').classList.remove('hidden');document.getElementById('mainApp').classList.add('hidden');}
function previewImage(){const i=document.getElementById('imageInput'),p=document.getElementById('imagePreview');
if(i.files&&i.files[0]){const r=new FileReader();r.onload=e=>{p.src=e.target.result;p.classList.remove('hidden');};r.readAsDataURL(i.files[0]);}}
function addData(){const t=document.getElementById('dataTitle').value,d=document.getElementById('dataDescription').value,img=document.getElementById('imageInput');
if(!t.trim()){alert('❌ กรุณากรอกหัวข้อ');return;}
const item={id:Date.now(),user:currentUser,title:t.trim(),description:d.trim(),image:null,timestamp:new Date().toLocaleString('th-TH')};
if(img.files&&img.files[0]){const r=new FileReader();r.onload=e=>{item.image=e.target.result;userData.push(item);displayData();clearForm();alert('✅ เพิ่มข้อมูลเรียบร้อยแล้ว!');};r.readAsDataURL(img.files[0]);}
else{userData.push(item);displayData();clearForm();alert('✅ เพิ่มข้อมูลเรียบร้อยแล้ว!');}}
function clearForm(){document.getElementById('dataTitle').value='';document.getElementById('dataDescription').value='';document.getElementById('imageInput').value='';document.getElementById('imagePreview').classList.add('hidden');}
function displayData(){const d=document.getElementById('dataList'),f=userData.filter(i=>i.user===currentUser);
if(f.length===0){d.innerHTML='<h2 style="color: #333; margin-bottom: 20px; text-align: center;">📋 ข้อมูลที่บันทึกไว้</h2><div style="text-align: center; color: #666; padding: 40px;"><p>🗂️ ยังไม่มีข้อมูลที่บันทึกไว้</p><p>เริ่มต้นเพิ่มข้อมูลแรกของคุณเลย!</p></div>';return;}
let h='<h2 style="color: #333; margin-bottom: 20px; text-align: center;">📋 ข้อมูลที่บันทึกไว้</h2>';f.reverse().forEach(i=>{h+=`<div class="data-item"><h3>📌 ${i.title}</h3>${i.description?`<p>📝 ${i.description}</p>`:''}${i.image?`<img src="${i.image}" alt="${i.title}" class="image-preview">`:''}<p style="color: #999; font-size: 0.9em; margin-top: 15px;">⏰ บันทึกเมื่อ: ${i.timestamp}</p><button onclick="deleteData(${i.id})" style="background: #ff6b6b; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-top: 10px;">🗑️ ลบข้อมูล</button></div>`;});d.innerHTML=h;}
function deleteData(id){if(confirm('❓ ต้องการลบข้อมูลนี้หรือไม่?')){userData=userData.filter(i=>i.id!==id);displayData();alert('✅ ลบข้อมูลเรียบร้อยแล้ว!');}}
function loadUserData(){displayData();}
document.addEventListener('keypress',e=>{if(e.key==='Enter'&&!document.getElementById('loginSection').classList.contains('hidden'))login();});
userData=[{id:1,user:'admin',title:'ตัวอย่างข้อมูลที่ 1',description:'นี่คือข้อมูลตัวอย่างสำหรับแสดงการทำงานของระบบ',image:null,timestamp:'18/8/2568 10:30:00'},
{id:2,user:'user',title:'ข้อมูลสำคัญ',description:'รายละเอียดข้อมูลที่สำคัญและต้องจดจำไว้',image:null,timestamp:'18/8/2568 09:15:00'}];
