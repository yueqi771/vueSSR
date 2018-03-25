<template>
	<div class="login">

		<!-- 登陆 : 左侧logo -->
		<div class="login-logo">
			<img src="../../assets/images/user.gif">
		</div>

		<!-- 登陆 : 右侧填写信息-->
		<div class="login-main">

			<!-- 登陆信息输入 -->
			<el-form class="login-main-input" :model="user"  :rules="login_rules">

				<!-- 账号输入 -->
				<el-form-item prop="account">
					<el-input class="phone-input"  v-model="user.account" placeholder="手机或邮箱" @keyup.native.enter="confirm_login"></el-input>
				</el-form-item>

				<!-- 密码 -->
				<el-form-item class="login-password" prop="password">
					<el-input type="password" class="password-input" placeholder="密码" v-model="user.password" @keyup.native.enter="confirm_login"></el-input>
				</el-form-item>
			</el-form>

			<!-- 是否同意用户协议 -->
			<div class="remember-me">
				<el-checkbox v-model="user.remember"></el-checkbox>
				<p class="remember-label">记住我</p>

				<router-link to="/getback">忘记密码?</router-link>
			</div>

			<!-- 第三方帐号绑定 -->
			<div class="plat-login">
				<p class="plat-title">用以下账号快速登录</p>
				<p class="plat-tip">第一次登录需绑定凯诺账号</p>
				<div class="plat-wrapper">
					<a href="/User/qqlogin" id="loginByQQ" class="icon iconfont qq">&#xe604;</a>
					<a href="/User/wxlogin" id="loginByWx" class="icon iconfont wx">&#xe603;</a>
				</div>
			</div>

			<!-- 登陆按钮 -->
			<el-button class="login-btn" type="primary" @click="confirm_login">登陆</el-button>

			<!-- 去登陆 -->
			<p class="login-to-login">没有账号？<router-link to="/register">去注册</router-link></p>
		</div>
	</div>
</template>

<style lang="less">
	@cano:#4B77AE;
	body{
		height: auto;
	}
	.login{
		overflow: hidden;
		width: 900px;
		margin:100px auto 0;

		// 左侧logo
		.login-logo{
		    width: 510px;
   		 	height: 436px;
			float: left;
			margin-top: 20px;
			img{
			    width: 470px;
    			height: 390px;
    			margin-left: -50px;
			}
		}

		// 右侧填写信息
		.login-main{
			width: 300px;
			float: right;
			margin-top: 70px;
			position: relative;

			// 用户是否同意协议
			.remember-me{
				width: 100%;
				clear: both;
				margin-top: 15px;
				overflow: hidden;
				.el-checkbox{
					float: left;
					width: 17px;
					height: 17px;
					.el-checkbox__inner{
						width: 17px;
						height: 17px;
					}
					.el-checkbox__inner:after{
						border: 1px solid #4B77AE;
					    border-left: 0;
					    border-top: 0;
					    height: 9px;
					    left: 4px;
					    position: absolute;
					    top: 1px;
					    width: 5px;
					}

				}
				.remember-label{
					float: left;
					width: 56px;
					font-size: 14px;
					color: #999;
					margin:2px 0 0 10px;
				}
				a{
					float: right;
					font-size: 14px;
					color: @cano;
					margin-top: 2px;
				}
			}

			// 登录:第三方帐号登录

			.plat-login{
				width: 150px;
				margin: 26px auto;
				.plat-title{
					text-align: center;
					font-size: 14px;
					color: #333333;
					margin-bottom: 8px;
				}
				.plat-tip{
					text-align: center;
					font-size: 12px;
					color: #717576;
					margin-bottom: 22px;
				}
				.plat-wrapper{
					width: 88px;
					margin:0 auto;
					overflow: hidden;
					.icon{
						display: inline-block;
						font-size: 26px;
						color: @cano;
						&.wx{
							float: right;
							font-size: 28px;
						}
						&.qq{
							float: left;
						}
					}

				}
			}

			// 登陆按钮
			.login-btn{
				width: 100%;
				background: #4B77AE;
				border: 1px solid #4B77AE;
			    margin-top: 10px;
			}

			// 去登陆
			.login-to-login{
				margin-top: 8px;
				font-size: 14px;
				color: #999;
				a{
					display: inline-block;
					margin-left: 8px;
					color: #4B77AE;
				}
			}

			.label{
				position: absolute;
				font-size: 16px;
				color: #999;
				z-index: 5;
			    top: 1px;
    			left: 6px;
			}
		}

		// 全局样式
		.el-input__inner:focus {
		    outline: none;
		    border: 1px solid #4B77AE;
		}
		.el-radio__input.is-checked .el-radio__inner {
		    border: 1px solid #4B77AE;
		    background: #4B77AE;
		}
		.el-radio__input.is-checked+.el-radio__label {
		    color: #4B77AE;
		}
		.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		    background-color: transparent;
		    border-color: #4B77AE;
		}
	}
</style>

<script type="text/javascript">
	export default{
		data (){

			// 账号号验证
			let validateAccount = (rule,value,callback) => {
				if(this.user.timezone == 'Australia/Perth' && !( Utils._match.mobile.test(value) || Utils._match.email.test(value) ) ){
					return callback(new Error('请输入正确的邮箱或手机号'));
				}
				callback();
			}

			// 密码验证
			let validatePassword = (rule,value,callback) => {
				if(value.length < 6){
					return callback(new Error('密码不能少于6位'));
				}
				callback();
			}
			return {
				// 用户信息存储
				user:{
					account:"",   // 账户名
					password:"", // 密码
					timezone:"", // 用户所在时区
					remember:true, // 是否同意凯诺条款
					tmpid:"",  // 微信id
				},


				// 验证规则
				login_rules: {
					account: [{validator: validateAccount, trigger: 'blur,change'}],
					password: [{validator: validatePassword, trigger: 'blur,change'}],
				}
			}
		},

		methods:{

			confirm_login (){
				// 是否返回跳转回来的页面
				let back_url = window.location.href.indexOf("from") != -1	? window.location.href.split('/from/')[1] : "";

				if(this.user.timezone == 'Australia/Perth' && this.user.account.trim().length > 0 && !( Utils._match.mobile.test(this.user.account) || Utils._match.email.test(this.user.account) ) ){$.popup({type:'error','text':'请填写正确的手机号或邮箱'});return}
				if(this.user.password.trim().length < 6){$.popup({type:'error','text':'请输入密码'}); return}

				let on_remember = this.user.remember ? 1 : 0;

				this.$root.apiPost('/User/login',{
					account:this.user.account,
					password:this.user.password,
					keep:on_remember,
					timezone:this.user.timezone,
				}).then((data) => {
					if(data.status == 1){

						// 存储到localstoreage
						var userInfo = {
							avatar:data.info.avatar,
							userName:data.info.username,
							role:data.info.role ? window.base64.encode(data.info.role) : "",
							is_right_timezone:data.info.is_right_timezone,
							uid:data.info.uid ? window.base64.encode(data.info.uid) : "",
							status:data.info.status ? window.base64.encode(data.info.status) : "",
							prefix:data.info.prefix ? window.base64.encode(data.info.prefix) : "",
							email:data.info.email ? window.base64.encode(data.info.email) : "",
							mobile:data.info.mobile ? window.base64.encode(data.info.mobile) : "",
							qq:data.info.qq ? window.base64.encode(data.info.qq) : "",
							level:data.info.teacher_level ? data.info.teacher_level : 0,
							remember:on_remember,
							remember_expires:new Date().getTime() + 7 * 24 * 3600 * 1000,
							short_expires:new Date().getTime() + (2 * 3600 * 1000),
						}

						store.set('userInfo',userInfo);
						store.set('UID',parseInt(data.info.uid));
						// 更新信息到vuex里面
		         		this.$store.commit( 'setUserInfo',store.get('userInfo') );


						if(data.info.role == 2){
							if(data.info.teacher_level == 4){
								window.location.href = '/public/teacher_visit';
								return;
							}

							window.location.href="/Teacher/index";
                        }else{
                            back_url == "" ? this.$root.judge_authority() : window.location.href ='http://' + document.domain +  back_url;
                        }

					}else{
						$.popup({'text':data.msg});
					}
				})
			}
		},

		mounted (){


		},
		created (){

		}
	}

	function setUserTimezone(element,timezone){
		var sOriginUrl = $(element).attr('href');
		$(element).attr('href',sOriginUrl+"/timezone/"+timezone)
	};
</script>
