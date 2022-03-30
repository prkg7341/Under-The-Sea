// import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";
import userService from "@services/user-service";

import { getConnection } from "typeorm";
import { maxHeaderSize } from "http";
import { Cipher } from "crypto";
import { Follow } from "@models/follow-model";
const router = Router();

// user info 불러오기
router.get("/info", async (req: Request, res: Response) => {
  const userSeq = Number(req.query.userSeq);
  console.log("userSeq -> ", userSeq);
  try {
    const userInfo = await userService.getUserInfo(userSeq);

    if (!userInfo) {
      res.status(404).json({ fail: "user가 존재하지 않습니다." });
    } else {
      const userNickname = userInfo.user_nickname;
      const userProfileImage = userInfo.user_profile_image;

      res.status(200).json({
        success: {
          userNickname: userNickname,
          userProfileImage: userProfileImage,
        },
      });
    }
  } catch (err) {
    console.error("error is", err);
    res.status(404).json({ fail: err });
  }
});

// 닉네임 중복 확인
router.get("/check/nickname", async (req: Request, res: Response) => {
  const inputNickname = String(req.query.userNickname);
  console.log("inputNickname -> ", inputNickname);
  try {
    const savedNickName = await userService.checkNickname(inputNickname);
    console.log("log", savedNickName);
    if (!savedNickName) {
      res.status(200).json({ success: "사용 가능한 닉네임입니다." });
    } else {
      res.status(404).json({ fail: "존재하는 닉네임입니다." });
    }
  } catch (err) {
    res.status(404).json({ fail: err });
  }
});

// 로그인 및 회원가입
router.post("/join", async (req, res, next) => {
  const userWalletAddress = req.body.userWalletAddress;
  console.log("userWalletAddress=>", userWalletAddress);
  try {
    const exUser = await userService.checkUser(userWalletAddress);

    // 로그인
    if (exUser) {
      return res.status(200).json({
        success: {
          userSeq: exUser.user_seq,
          userNickname: exUser.user_nickname,
          userProfileImage: exUser.user_profile_image,
          userWalletAddress: exUser.user_wallet_address,
          userRole: exUser.user_role,
        },
      });
    } else {
      const newUser = await userService.createUser(userWalletAddress);
      return res.status(200).json({ success: "join success" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

//회원탈퇴
router.put("/withdraw", async (req, res, next) => {
  const userSeq = req.body.userSeq;
  try {
    const exUser = await userService.getUserInfo(userSeq);
    console.log(userSeq);
    if (exUser) {
      userService.deleteUser(userSeq);
      return res.status(200).json({ success: "" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

// 닉네임 수정하기
router.put("/edit/nickname", async (req, res, next) => {
  console.log("start edit nickname... ");
  const userSeq = req.body.userSeq;
  const newNickname = req.body.userNickname;
  try {
    const savedNickName = await userService.checkNickname(newNickname);
    if (savedNickName) {
      return res.status(404).json({ fail: "존재하는 닉네임입니다." });
    } else {
      userService.editNickname(userSeq, newNickname);
      return res.status(200).json({ success: "닉네임 변경 성공" });
    }
  } catch (error) {
    return res.status(404).json({ fail: error });
  }
});

// 프로필 사진 변경하기
router.put("/edit/image", async (req, res, next) => {
  console.log("start edit profile iamge... ");
  const userSeq = req.body.userSeq;
  const newProfileImage = req.body.userProfileImage;
  try {
    const exUser = await userService.getUserInfo(userSeq);
    if (exUser) {
      userService.editProfileImage(userSeq, newProfileImage);
      return res.status(200).json({ success: "사진 변경 성공" });
    } else {
      return res.status(404).json({ fail: "회원 조회 실패" });
    }
  } catch (error) {
    return res.status(404).json({ fail: "사진 변경 실패" });
  }
});

// 프로필 페이지에서 follower 보기
router.get("/followings", async (req, res, next) => {
  console.log("checking followers");
  const myUserSeq = req.query.myUserSeq;
  const profileUserSeq = req.query.profileUserSeq;
  const followList = await userService.getFollowings(
    Number(myUserSeq),
    Number(profileUserSeq)
  );
  console.log(followList);
  const mylist: Array<any> = [];
  if (Number(myUserSeq) === Number(profileUserSeq)) {
    console.log("same");
    for (let idx = 0; idx < followList.length; idx++) {
      mylist.push({
        userSeq: followList[idx].user_user_seq,
        userNickname: followList[idx].user_user_nickname,
        userProfileImage: followList[idx].user_user_profile_image,
        following: "y",
      });
    }
  } else {
    for (let idx = 0; idx < followList.length; idx++) {
      console.log(myUserSeq, profileUserSeq, myUserSeq === profileUserSeq);
      const followRepository = getConnection().getRepository(Follow);
      const checking = await followRepository.findOne({
        where: {
          user_from: Number(myUserSeq),
          user_to: followList[idx].follow_user_to,
        },
      });
      if (checking) {
        mylist.push({
          userSeq: followList[idx].user_user_seq,
          userNickname: followList[idx].user_user_nickname,
          userProfileImage: followList[idx].user_user_profile_image,
          following: "y",
        });
      } else {
        mylist.push({
          userSeq: followList[idx].user_user_seq,
          userNickname: followList[idx].user_user_nickname,
          userProfileImage: followList[idx].user_user_profile_image,
          following: "n",
        });
      }
    }
    console.log(mylist);
  }
  return res.status(200).json({ success: mylist });
});
export default router;
