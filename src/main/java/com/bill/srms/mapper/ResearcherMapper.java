package com.bill.srms.mapper;

import com.bill.srms.pojo.Researcher;
import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

public interface ResearcherMapper extends Mapper<Researcher> {
    @Select(" SELECT R.*,S.name as studio_name " +
            " FROM researcher R LEFT JOIN research_studio S " +
            " ON R.studio_id = S.id;")
    List<Researcher> selectAllWithStudio();

    @Select(" SELECT R.*,S.name as studio_name " +
            " FROM researcher R LEFT JOIN research_studio S " +
            " ON R.studio_id = S.id " +
            " WHERE S.id = #{studioId};")
    List<Researcher> selectByStudioId(Integer studioId);

    @Select(" SELECT * FROM researcher WHERE id = #{id} ")
    Researcher selectById(Integer id);

    @Select(" SELECT R.*, S.name as studio_name " +
            " FROM researcher R " +
            " LEFT JOIN research_studio S " +
            " ON R.studio_id = S.id " +
            " WHERE R.id IN ( " +
            "     SELECT researcher_id " +
            "     FROM join_project " +
            "     WHERE project_id = #{projectId});")
    List<Researcher> selectByProjectId(Integer projectId);


    @Select(" SELECT R.*, S.name as studio_name " +
            " FROM researcher R " +
            " LEFT JOIN research_studio S " +
            " ON R.studio_id = S.id " +
            " WHERE R.id IN ( " +
            "     SELECT researcher_id " +
            "     FROM join_project " +
            "     WHERE sub_topic_id = #{subTopicId});")
    List<Researcher> selectBySubTopic(Integer subTopicId);


    @Select(" SELECT R.*, S.name as studio_name " +
            " FROM researcher R " +
            " LEFT JOIN research_studio S  " +
            " ON R.studio_id = S.id  " +
            " WHERE R.id IN ( " +
            "     SELECT researcher_id " +
            "     FROM contribute_to " +
            "     WHERE achievement_id = #{achievementId});")
    List<Researcher> selectByAchievementId(Integer achievementId);
}
