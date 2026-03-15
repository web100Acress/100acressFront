import React, { useMemo } from 'react';Change Profile
          </span>
        </div>
        <br />
        <div className="col-md-12">
          <label className="labels">Id Number:</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            defaultValue="" readOnly
          />
        </div>{" "}
        <br />
        <div className="col-md-12">
          <label className="labels">Profile Type:</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            defaultValue=""
            readOnly
          />
        </div>
      </div>
    </div>
  </div>
</div>

    </Wrapper>
  )
}

export default ProfilePage
const Wrapper= styled.section`
body {
    background: rgb(99, 39, 120)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 14px;
    margin-top:10px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
`