/*sujestão
    // Abrir modal
    var modal = document.getElementById("configModal");
        var btn = document.getElementById("openModal");
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        // Fechar modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    // Lógica das abas
    const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('active'));
                tab.classList.add('active');

                const tabContent = document.getElementById(tab.getAttribute('data-tab'));
                contents.forEach(content => content.classList.remove('active'));
                tabContent.classList.add('active');
            });
        }); 
*/
