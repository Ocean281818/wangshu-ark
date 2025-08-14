/**
 * 站点最小交互脚本
 * - 移动端菜单开合
 * - 预留可扩展入口（如轮播、滚动联动等）
 */
(function () {
	const toggle = document.querySelector('.nav-toggle');
	const list = document.getElementById('nav-list');
	if (!toggle || !list) return;

	toggle.addEventListener('click', () => {
		const expanded = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!expanded));
		list.setAttribute('aria-expanded', String(!expanded));
	});

	// 滚动方向感知：下滚隐藏头部，上滚显示
	let lastY = window.scrollY;
	const header = document.querySelector('.site-header');
	const threshold = 24; // 小阈值，避免轻微滚动抖动
	window.addEventListener('scroll', () => {
		const currentY = window.scrollY;
		const delta = currentY - lastY;
		if (!header) return;
		if (currentY > 80 && delta > threshold) {
			header.classList.add('header-hidden');
		} else if (delta < -threshold || currentY <= 80) {
			header.classList.remove('header-hidden');
		}
		lastY = currentY;
	}, { passive: true });
	// 平滑滚动导航跳转
	list.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener('click', (e) => {
			const targetId = a.getAttribute('href');
			if (!targetId || targetId === '#') return;
			const target = document.querySelector(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// 关闭移动端菜单
				toggle.setAttribute('aria-expanded', 'false');
				list.setAttribute('aria-expanded', 'false');
			}
		});
	});
})();

