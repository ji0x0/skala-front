const guestbookForm = document.querySelector('#guestbook-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#userpassword');
const messageInput = document.querySelector('#message');
const guestbookList = document.querySelector('#guestbook-list');

const storageKey = 'guestbookEntries';
let guestbookEntries = JSON.parse(localStorage.getItem(storageKey)) || [];

function saveGuestbook() {
    localStorage.setItem(storageKey, JSON.stringify(guestbookEntries));
}

function renderGuestbook() {
    guestbookList.innerHTML = '';

    guestbookEntries.forEach(function(entry, index) {
        const item = document.createElement('li');
        const name = document.createElement('strong');
        const message = document.createElement('p');
        const date = document.createElement('span');
        const actionBox = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        name.textContent = entry.username;
        message.textContent = entry.message;
        date.textContent = entry.updatedAt ? `${entry.createdAt} / 수정: ${entry.updatedAt}` : entry.createdAt;

        actionBox.className = 'guestbook-actions';
        editButton.type = 'button';
        deleteButton.type = 'button';
        editButton.textContent = '수정';
        deleteButton.textContent = '삭제';

        editButton.addEventListener('click', function() {
            editGuestbookEntry(index);
        });

        deleteButton.addEventListener('click', function() {
            deleteGuestbookEntry(index);
        });

        item.appendChild(name);
        item.appendChild(message);
        item.appendChild(date);
        actionBox.appendChild(editButton);
        actionBox.appendChild(deleteButton);
        item.appendChild(actionBox);
        guestbookList.prepend(item);
    });
}

function checkPassword(entry) {
    if (!entry.password) {
        alert('이 글은 저장된 비밀번호가 없어 수정하거나 삭제할 수 없습니다.');
        return false;
    }

    const password = prompt('비밀번호를 입력해주세요.');

    if (password !== entry.password) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }

    return true;
}

function editGuestbookEntry(index) {
    const entry = guestbookEntries[index];

    if (!checkPassword(entry)) return;

    const newMessage = prompt('수정할 내용을 입력해주세요.', entry.message);

    if (newMessage === null) return;

    const trimmedMessage = newMessage.trim();

    if (!trimmedMessage) {
        alert('내용을 입력해주세요.');
        return;
    }

    entry.message = trimmedMessage;
    entry.updatedAt = new Date().toLocaleString('ko-KR');

    saveGuestbook();
    renderGuestbook();
}

function deleteGuestbookEntry(index) {
    const entry = guestbookEntries[index];

    if (!checkPassword(entry)) return;
    if (!confirm('정말 삭제할까요?')) return;

    guestbookEntries.splice(index, 1);
    saveGuestbook();
    renderGuestbook();
}

guestbookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const message = messageInput.value.trim();

    if (!username || !password || !message) {
        alert('닉네임, 비밀번호, 남기고 싶은 말을 입력해주세요.');
        return;
    }

    guestbookEntries.push({
        id: Date.now(),
        username: username,
        password: password,
        message: message,
        createdAt: new Date().toLocaleString('ko-KR')
    });

    saveGuestbook();
    renderGuestbook();

    guestbookForm.reset();
    usernameInput.focus();
});

renderGuestbook();
